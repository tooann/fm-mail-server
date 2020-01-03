const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  id: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  createDate: { type: Date, default: Date.now() }
});

mongoose.model('Cart', cartSchema);