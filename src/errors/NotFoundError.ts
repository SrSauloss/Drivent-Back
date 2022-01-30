export default class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || "No result for this search!");

    this.name = "NotFoundError";
  }
}
