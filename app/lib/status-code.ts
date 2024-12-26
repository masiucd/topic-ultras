/**
 * An object containing HTTP status codes and their corresponding descriptions.
 *
 * @constant
 * @type {object}
 * @property {number} OK - 200: The request was successful.
 * @property {number} CREATED - 201: The request was successful and a resource was created.
 * @property {number} ACCEPTED - 202: The request has been accepted for processing, but the processing has not been completed.
 * @property {number} NO_CONTENT - 204: The request was successful but the response body is empty.
 * @property {number} BAD_REQUEST - 400: The request could not be understood or was missing required parameters.
 * @property {number} UNAUTHORIZED - 401: Unauthorized to access the resource.
 * @property {number} FORBIDDEN - 403: Access to the resource is forbidden.
 * @property {number} NOT_FOUND - 404: The requested resource could not be found.
 * @property {number} CONFLICT - 409: The request could not be completed due to a conflict.
 * @property {number} INTERNAL_SERVER_ERROR - 500: A generic error occurred on the server.
 * @property {number} NOT_IMPLEMENTED - 501: The server does not support the requested feature.
 * @property {number} BAD_GATEWAY - 502: An invalid response was received from an upstream server.
 * @property {number} SERVICE_UNAVAILABLE - 503: The server is currently unable to handle the request.
 * @property {number} GATEWAY_TIMEOUT - 504: The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
 */
export const STATUS_CODE = {
  OK: 200, // OK - The request was successful
  CREATED: 201, // Created - The request was successful and a resource was created
  ACCEPTED: 202, // Accepted - The request has been accepted for processing, but the processing has not been completed
  NO_CONTENT: 204, // No Content - The request was successful but the response body is empty
  BAD_REQUEST: 400, // Bad Request - The request could not be understood or was missing required parameters
  UNAUTHORIZED: 401, // Unauthorized - Unauthorized to access the resource
  FORBIDDEN: 403, // Forbidden - Access to the resource is forbidden
  NOT_FOUND: 404, // Not Found - The requested resource could not be found
  CONFLICT: 409, // Conflict - The request could not be completed due to a conflict
  INTERNAL_SERVER_ERROR: 500, // Internal Server Error - A generic error occurred on the server
  NOT_IMPLEMENTED: 501, // Not Implemented - The server does not support the requested feature
  BAD_GATEWAY: 502, // Bad Gateway - An invalid response was received from an upstream server
  SERVICE_UNAVAILABLE: 503, // Service Unavailable - The server is currently unable to handle the request
  GATEWAY_TIMEOUT: 504, // Gateway Timeout - The server is currently unable to handle the request due to a temporary overloading or maintenance of the server
} as const;
