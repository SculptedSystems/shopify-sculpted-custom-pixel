import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";

export function dataLayerPush(message: object) {
  logger.info(`Pushing Message to Data Layer -> ${stringifyObject(message)}`);

  window.dataLayer.push(message);
}
