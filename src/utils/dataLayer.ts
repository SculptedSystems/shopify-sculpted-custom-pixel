import { DataLayerMessage } from "@models";
import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";
import { isCheckout } from "./isCheckout";

export function dataLayerPush(message: DataLayerMessage): void {
  logger.info(`Pushing Message to Data Layer -> ${stringifyObject(message)}`);

  if (isCheckout()) {
    window.dataLayer.push(message);
  } else {
    const origin = init.context.document.location.href;
    window.parent.postMessage(message, origin);
  }
}
