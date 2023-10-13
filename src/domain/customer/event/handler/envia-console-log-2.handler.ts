import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EnviaConsoleLog2Event from "../envia-console-log-2.event";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<EnviaConsoleLog2Event>
{
  handle(event: EnviaConsoleLog2Event): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated"); 
  }
}