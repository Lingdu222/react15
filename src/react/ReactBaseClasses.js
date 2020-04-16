function Component(props, context, updater) {
    this.props = props;
    this.context = context;
}
// react 凭借这句话判断是否是 react类组件
Component.prototype.isReactComponent = {};
export { Component }