import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed";
import CustomerCreatedEvent from "../event/customer-created.event";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/envia-console.log.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher;
  private static _eventHandler1: EnviaConsoleLog1Handler
  private static _eventHandler2: EnviaConsoleLog2Handler
  private static _eventHandlerAddress: EnviaConsoleLogHandler

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this._eventDispatcher = new EventDispatcher();
    this._eventDispatcher.register("CustomerCreatedEvent", Customer._eventHandler1);
    this._eventDispatcher.register("CustomerCreatedEvent", Customer._eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({});

    this._eventDispatcher.notify(customerCreatedEvent);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  static getEventHandler1(): EnviaConsoleLog1Handler {
    return Customer._eventHandler1 = new EnviaConsoleLog1Handler();
  }

  static getEventHandler2(): EnviaConsoleLog2Handler {
    return Customer._eventHandler2 = new EnviaConsoleLog2Handler();
  }

  static getEventHandlerAddress(): EnviaConsoleLogHandler {
    return Customer._eventHandlerAddress = new EnviaConsoleLogHandler();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;

    this._eventDispatcher = new EventDispatcher();
    this._eventDispatcher.register("CustomerAddressChangedEvent", Customer._eventHandlerAddress);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: this._address.toString(),
    });

    this._eventDispatcher.notify(customerAddressChangedEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
