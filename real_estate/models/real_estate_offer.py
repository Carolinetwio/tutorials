from odoo import _, api, fields, models
from odoo.exceptions import ValidationError
from odoo.tools import date_utils


class RealEstateOffer(models.Model):
    _name = 'real.estate.offer'
    _description = "Real Estate Offer"
    _sql_constraints = [
        ('positive_amount', 'CHECK (amount > 0)', "The amount must be strictly positive.")
    ]

    amount = fields.Float(string="Amount", required=True)
    buyer_id = fields.Many2one(string="Buyer", comodel_name='res.partner', required=True)
    phone = fields.Char(string="Phone", related='buyer_id.phone')
    date = fields.Date(string="Date", required=True, default=fields.Date.today)
    validity = fields.Integer(
        string="Validity", help="The number of days before the offer expires.", default=7
    )
    expiry_date = fields.Date(
        string="Expiry Date",
        compute='_compute_expiry_date',
        inverse='_inverse_expiry_date',
        store=True,
    )
    state = fields.Selection(
        string="State",
        selection=[
            ('waiting', "Waiting"),
            ('accepted', "Accepted"),
            ('refused', "Refused"),
        ],
        required=True,
        default='waiting',
    )
    property_id = fields.Many2one(
        string="Property", comodel_name='real.estate.property', required=True
    )

    @api.depends('date', 'validity')
    def _compute_expiry_date(self):
        for offer in self:
            offer.expiry_date = date_utils.add(offer.date, days=offer.validity)

    def _inverse_expiry_date(self):
        for offer in self:
            offer.validity = date_utils.relativedelta(dt1=offer.expiry_date, dt2=offer.date).days

    @api.constrains('amount')
    def _check_amount_higher_than_previous_offers(self):
        for offer in self:
            if offer.amount < max(offer.property_id.offer_ids.mapped('amount')):
                raise ValidationError(_(
                    "The amount of the new offer must be higher than the amount of the previous "
                    "offers."
                ))

    @api.constrains('state')
    def _check_state_is_accepted_for_only_one_offer(self):
        for offer in self.filtered(lambda o: o.state == 'accepted'):
            if len(offer.property_id.offer_ids.filtered(lambda o: o.state == 'accepted')) > 1:
                raise ValidationError(_("Only one offer can be accepted for a property."))
