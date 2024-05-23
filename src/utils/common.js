const jwt = require("jsonwebtoken");

// common api response function
function response({ res, status, message, data }) {
  res.json({ status, message, data });
}

// FOR token generation
async function tokenGeneration({ payload, key, time }) {
  const tokenGen = jwt.sign(payload, key, {
    expiresIn: time,
  });
  return tokenGen;
}

// for token decoding
async function tokenDecode({ token }) {
  const tokenGen = jwt.decode(token);
  return tokenGen;
}

// For static status
const status = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  lengthRequired: 411,
  payloadTooLarge: 413,
  tooManyRequests: 429,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
};

// For static messages
const messages = {
  success: "Success",
  fetched: "Fetched",
  updated: "Updated",
  deleted: "Deleted",
  ok: "Operation successful",
  created: "Resource created successfully",
  accepted: "Request accepted for processing",
  noContent: "No content available",
  found: "Resource found",
  badRequest: "Bad request",
  unauthorized: "Unauthorized access",
  paymentRequired: "Payment required",
  forbidden: "Forbidden access",
  notFound: "Resource not found",
  methodNotAllowed: "Method not allowed",
  notAcceptable: "Not acceptable",
  conflict: "Conflict occurred",
  gone: "Resource gone",
  lengthRequired: "Length required",
  payloadTooLarge: "Payload too large",
  tooEarly: "Too early",
  tooManyRequests: "Too many requests",
  internalServerError: "Internal server error",
  notImplemented: "Not implemented",
  badGateway: "Bad gateway",
  serviceUnavailable: "Service unavailable",
  gatewayTimeout: "Gateway timeout",
};

module.exports = {
  response,
  status,
  messages,
  tokenGeneration,
  tokenDecode,
};
