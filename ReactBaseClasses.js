const emptyObject = {}
function Component(props, context) {
    this.props = props;
    this.context = context;
    this.ref = emptyObject

}

Component.prototype.isReactComponent = {}

export { Component };