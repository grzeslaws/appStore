import * as React from "react";

export class EmptyComponent extends React.Component<{}, {}> {
    public componentWillMount() {
        console.log("componentWillMount");
        
    }

    public componentWillUnmount() {
        alert("Hello! I am an alert box!!");
        console.log("componentWillUnmount");
    }

    public render() {
        return <></>;
    }
}
