export function toIdJSON(doc, ret) {
  ret.id = ret._id?.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
}

export const baseOptions = {
  timestamps: true,
  toJSON: { transform: toIdJSON },
};
