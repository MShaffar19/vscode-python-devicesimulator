import * as open from "open";
import * as vscode from "vscode";
import { CONSTANTS, DialogResponses, TelemetryEventName } from "../constants";
import * as utils from "../extension_utils/utils";
import { DeviceSelectionService } from "./deviceSelectionService";
import TelemetryAI from "../telemetry/telemetryAI";

export class TelemetryHandlerService {
    private telemetryAI: TelemetryAI;
    private deviceSelectionService: DeviceSelectionService;

    constructor(
        telemetryAI: TelemetryAI,
        deviceSelectionService: DeviceSelectionService
    ) {
        this.telemetryAI = telemetryAI;
        this.deviceSelectionService = deviceSelectionService;
    }

    public handleDebuggerTelemetry = () => {
        switch (this.deviceSelectionService.getCurrentActiveDevice()) {
            case CONSTANTS.DEVICE_NAME.CPX:
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_DEBUGGER_INIT_SUCCESS
                );
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_DEBUGGER_INIT_SUCCESS
                );
                break;
            default:
                break;
        }
    };

    public handleDebuggerFailTelemetry = () => {
        switch (this.deviceSelectionService.getCurrentActiveDevice()) {
            case CONSTANTS.DEVICE_NAME.CPX:
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_DEBUGGER_INIT_FAIL
                );
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_DEBUGGER_INIT_FAIL
                );
                break;
            default:
                break;
        }
    };

    public handleButtonPressTelemetry = (buttonState: any) => {
        switch (this.deviceSelectionService.getCurrentActiveDevice()) {
            case CONSTANTS.DEVICE_NAME.CPX:
                this.handleCPXButtonPressTelemetry(buttonState);
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                this.handleMicrobitButtonPressTelemetry(buttonState);
                break;
            default:
                break;
        }
    };

    public handleGestureTelemetry = (sensorState: any) => {
        switch (this.deviceSelectionService.getCurrentActiveDevice()) {
            case CONSTANTS.DEVICE_NAME.CPX:
                this.handleCPXGestureTelemetry(sensorState);
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                break;
            default:
                break;
        }
    };

    public handleSensorTelemetry = (sensor: string) => {
        switch (this.deviceSelectionService.getCurrentActiveDevice()) {
            case CONSTANTS.DEVICE_NAME.CPX:
                this.handleCPXSensorTelemetry(sensor);
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                this.handleMicrobitSensorTelemetry(sensor);
                break;
            default:
                break;
        }
    };

    public handleCPXButtonPressTelemetry = (buttonState: any) => {
        if (buttonState.button_a && buttonState.button_b) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.CPX_SIMULATOR_BUTTON_AB
            );
        } else if (buttonState.button_a) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.CPX_SIMULATOR_BUTTON_A
            );
        } else if (buttonState.button_b) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.CPX_SIMULATOR_BUTTON_B
            );
        } else if (buttonState.switch) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.CPX_SIMULATOR_SWITCH
            );
        }
    };

    public handleCPXGestureTelemetry = (sensorState: any) => {
        if (sensorState.shake) {
            this.handleCPXSensorTelemetry("shake");
        } else if (sensorState.touch) {
            this.handleCPXSensorTelemetry("touch");
        }
    };

    public handleCPXSensorTelemetry = (sensor: string) => {
        switch (sensor) {
            case "temperature":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_TEMPERATURE_SENSOR
                );
                break;
            case "light":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_LIGHT_SENSOR
                );
                break;
            case "motion_x":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_MOTION_SENSOR
                );
                break;
            case "motion_y":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_MOTION_SENSOR
                );
                break;
            case "motion_z":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_MOTION_SENSOR
                );
                break;
            case "shake":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_SHAKE
                );
                break;
            case "touch":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_SIMULATOR_CAPACITIVE_TOUCH
                );
                break;
        }
    };

    public handleMicrobitButtonPressTelemetry = (buttonState: any) => {
        if (buttonState.button_a && buttonState.button_b) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.MICROBIT_SIMULATOR_BUTTON_AB
            );
        } else if (buttonState.button_a) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.MICROBIT_SIMULATOR_BUTTON_A
            );
        } else if (buttonState.button_b) {
            this.telemetryAI.trackFeatureUsage(
                TelemetryEventName.MICROBIT_SIMULATOR_BUTTON_B
            );
        }
    };

    public handleMicrobitSensorTelemetry = (sensor: string) => {
        switch (sensor) {
            case "temperature":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_SIMULATOR_TEMPERATURE_SENSOR
                );
                break;
            case "light":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_SIMULATOR_LIGHT_SENSOR
                );
                break;
            case "motion_x":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_SIMULATOR_MOTION_SENSOR
                );
                break;
            case "motion_y":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_SIMULATOR_MOTION_SENSOR
                );
                break;
            case "motion_z":
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_SIMULATOR_MOTION_SENSOR
                );
                break;
        }
    };

    public handleNewFileErrorTelemetry = () => {
        switch (this.deviceSelectionService.getCurrentActiveDevice()) {
            case CONSTANTS.DEVICE_NAME.CPX:
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.CPX_ERROR_COMMAND_NEW_FILE
                );
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                this.telemetryAI.trackFeatureUsage(
                    TelemetryEventName.MICROBIT_ERROR_COMMAND_NEW_FILE
                );
                break;
            default:
                break;
        }
    };

    public getTelemetryEventsForStartingDeployToDevice = (device: string) => {
        let deployTelemetryEvent: string;
        let deployPerformanceTelemetryEvent: string;
        switch (device) {
            case CONSTANTS.DEVICE_NAME.CPX:
                deployTelemetryEvent =
                    TelemetryEventName.CPX_COMMAND_DEPLOY_DEVICE;
                deployPerformanceTelemetryEvent =
                    TelemetryEventName.CPX_COMMAND_DEPLOY_DEVICE;
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                deployTelemetryEvent =
                    TelemetryEventName.MICROBIT_COMMAND_DEPLOY_DEVICE;
                deployPerformanceTelemetryEvent =
                    TelemetryEventName.MICROBIT_COMMAND_DEPLOY_DEVICE;
                break;
            case CONSTANTS.DEVICE_NAME.CLUE:
                deployTelemetryEvent =
                    TelemetryEventName.CLUE_COMMAND_DEPLOY_DEVICE;
                deployPerformanceTelemetryEvent =
                    TelemetryEventName.CLUE_COMMAND_DEPLOY_DEVICE;
                break;
        }
        return {
            deployTelemetryEvent: deployTelemetryEvent,
            deployPerformanceTelemetryEvent: deployPerformanceTelemetryEvent,
        };
    };

    public handleDeployToDeviceErrorTelemetry = (
        data: string,
        device: string
    ) => {
        let telemetryErrorName: string;
        switch (device) {
            case CONSTANTS.DEVICE_NAME.CPX:
                telemetryErrorName =
                    TelemetryEventName.CPX_ERROR_PYTHON_DEVICE_PROCESS;
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                telemetryErrorName =
                    TelemetryEventName.MICROBIT_ERROR_PYTHON_DEVICE_PROCESS;
            case CONSTANTS.DEVICE_NAME.CLUE:
                telemetryErrorName =
                    TelemetryEventName.CLUE_ERROR_PYTHON_DEVICE_PROCESS;
        }
        this.telemetryAI.trackFeatureUsage(telemetryErrorName, {
            error: `${data}`,
        });
    };

    public handleDeployToDeviceFinishedTelemetry = (
        message: any,
        device: string
    ) => {
        let successCommandDeployDevice: string;
        let errorCommandDeployWithoutDevice: string;
        switch (device) {
            case CONSTANTS.DEVICE_NAME.CPX:
                successCommandDeployDevice =
                    TelemetryEventName.CPX_SUCCESS_COMMAND_DEPLOY_DEVICE;
                errorCommandDeployWithoutDevice =
                    TelemetryEventName.CPX_ERROR_DEPLOY_WITHOUT_DEVICE;
                break;
            case CONSTANTS.DEVICE_NAME.MICROBIT:
                successCommandDeployDevice =
                    TelemetryEventName.MICROBIT_SUCCESS_COMMAND_DEPLOY_DEVICE;
                errorCommandDeployWithoutDevice =
                    TelemetryEventName.MICROBIT_ERROR_DEPLOY_WITHOUT_DEVICE;
                break;
            case CONSTANTS.DEVICE_NAME.CLUE:
                successCommandDeployDevice =
                    TelemetryEventName.CLUE_SUCCESS_COMMAND_DEPLOY_DEVICE;
                errorCommandDeployWithoutDevice =
                    TelemetryEventName.CLUE_ERROR_DEPLOY_WITHOUT_DEVICE;
                break;
        }

        switch (message.type) {
            case "complete":
                this.telemetryAI.trackFeatureUsage(successCommandDeployDevice);
                break;
            case "no-device":
                this.telemetryAI.trackFeatureUsage(
                    errorCommandDeployWithoutDevice
                );
                if (
                    device === CONSTANTS.DEVICE_NAME.CPX ||
                    device === CONSTANTS.DEVICE_NAME.CLUE
                ) {
                    vscode.window
                        .showErrorMessage(
                            CONSTANTS.ERROR.NO_DEVICE,
                            DialogResponses.HELP
                        )
                        .then((selection: vscode.MessageItem | undefined) => {
                            if (selection === DialogResponses.HELP) {
                                const okAction = () => {
                                    let helpLink: string;
                                    let helpTelemetryEvent: string;
                                    if (device === CONSTANTS.DEVICE_NAME.CPX) {
                                        helpLink = CONSTANTS.LINKS.CPX_HELP;
                                        helpTelemetryEvent =
                                            TelemetryEventName.CPX_CLICK_DIALOG_HELP_DEPLOY_TO_DEVICE;
                                    } else if (
                                        device === CONSTANTS.DEVICE_NAME.CLUE
                                    ) {
                                        helpLink = CONSTANTS.LINKS.CLUE_HELP;
                                        helpTelemetryEvent =
                                            TelemetryEventName.CLUE_CLICK_DIALOG_HELP_DEPLOY_TO_DEVICE;
                                    }
                                    open(helpLink);
                                    this.telemetryAI.trackFeatureUsage(
                                        helpTelemetryEvent
                                    );
                                };
                                utils.showPrivacyModal(
                                    okAction,
                                    CONSTANTS.INFO.THIRD_PARTY_WEBSITE_ADAFRUIT
                                );
                            }
                        });
                } else if (device === CONSTANTS.DEVICE_NAME.MICROBIT) {
                    vscode.window.showErrorMessage(CONSTANTS.ERROR.NO_DEVICE);
                }
                break;
            case "low-python-version":
                vscode.window.showErrorMessage(
                    CONSTANTS.ERROR.LOW_PYTHON_VERSION_FOR_MICROBIT_DEPLOYMENT
                );
                break;
            default:
                console.log(
                    `Non-state JSON output from the process : ${message}`
                );
                break;
        }
    };
}