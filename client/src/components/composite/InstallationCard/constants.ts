export const jsImportCode = `import { ErrorDashboardClient, sendError } from "higuard-sdk";`;
export const jsInitializationCode = `const errorDashboardClient = ErrorDashboardClient.initialize({
    clientId: "client-id",
    clientSecret: "client-secret"
});`;

export const jsSendErrorCode = `try { console.log('Works') }
  catch (error) {
    sendError(
      // Stack trace of error
      error.stack_trace,
      // Error message used to identify the error
      error.message,
      // Optional Tags to be sent with the error
      // results in a key-value pair { "key" : "tag_value" }
      [{ key: "key", value: "tag_value" }],
      "affected_user_id"
    );
}`;

export const pyImportCode = `from higuard_sdk import ErrorDashboardClient, send_error
from traceback import format_exc
`;

export const pyInitializationCode = `error_dashboard_client = ErrorDashboardClient.initialize(
    client_id="client-id",
    client_secret="client-secret"
)`;

export const pySendErrorCode = `try:
  print('Works')
 except Exception as error:
    client = error_dashboard_client._instance
    tb_str = traceback.format_exc()
    client.send_error(
        tb_str,
        str(error),
        # Optional Tags to be sent with the error
        # results in a key-value pair { "key" : "tag_value" }
        [{"key": "key", "value": "tag_value"}],
        "affected_user_id"
     )`;

export const rustImportCode = `use higuard_sdk::ErrorDashboardClient;`;

export const rustInitializationCode = `let client_id = "your_client_id";
let client_secret = "your_client_secret";
let error_dashboard_client = ErrorDashboardClient::initialize(client_id, client_secret);
`;

export const rustSendErrorCode = `// Example function that might fail
  fn perform_action() -> Result<(), Box<dyn Error>> {
      // Simulate a possible error (e.g., file not found)
      let _file = File::open("non_existent_file.txt")?;
      Ok(())
  }

  match perform_action() {
      Ok(_) => println!("Action performed successfully"),
      Err(e) => {
          // Send the error to the error dashboard
          error_dashboard_client.send_error(e, "Failed to perform action").await;
        }
    }
}
`;
