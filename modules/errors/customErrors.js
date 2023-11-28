class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotFoundError';
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    }
}

class DataValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DataValidationError';
    }
}

module.exports = {
    ResourceNotFoundError,
    DatabaseError,
    DataValidationError
};