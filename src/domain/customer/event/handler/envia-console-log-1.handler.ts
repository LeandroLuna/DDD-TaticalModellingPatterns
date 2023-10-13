import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EnviaConsoleLog1Event from "../envia-console-log-1.event";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<EnviaConsoleLog1Event>
{
  handle(event: EnviaConsoleLog1Event): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated"); 
  }
}