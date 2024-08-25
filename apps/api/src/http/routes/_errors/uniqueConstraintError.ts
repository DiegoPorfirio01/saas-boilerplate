export class UniqueConstraintError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unique Constraint Error')
  }
}
