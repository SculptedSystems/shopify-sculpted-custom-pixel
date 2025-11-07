import { logger } from "./logger";
import { stringifyObject } from "./stringify";

export function buildEventHandler(handler) {
  return (event) => {
    logger.debug(stringifyObject(event));
    handler(event);
  };
}
