import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class NotificationConsole extends LightningElement {
  @track
  notifications = [];
  async connectedCallback() {
    this.dispatchEvent(
      new ShowToastEvent({
        variant: "success",
        title: "Ready to receive notifications"
      })
    );
    this.notifications = [
      { id: "id1", time: "00:01", message: "Greetings Trailblazer!" },
      { id: "id2", time: "00:02", message: "Congratulations on building this first version of the app." },
      { id: "id3", time: "00:03", message: "Beware of the bears." }
    ];
  }
  handleClearClick() {
    this.notifications = [];
  }
  get notificationCount() {
    return this.notifications.length;
  }
}