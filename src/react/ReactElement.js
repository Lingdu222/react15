
import ReactCurrentOwner from './ReactCurrentOwner';
import { REACT_ELEMENT_TYPE } from '../shard/ReactSymbols';

function hasValidRef(config) {
    return config.ref !== undefined;
}
function hasValidKey(config) {
    return config.key !== undefined;
}
const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true

}

export default function createElement(type, config, children) {
    let prosName;// 变量的属性名
    const props = {};// 变量的props对象

    let key = null;// 标识自己的唯一性；
    let ref = null;
    let self = null;// 用来获取this指向
    let source = null;// 用来定位组件位置 具体到那一个行那一列
    // 处理内部属性
    if (config !== null) {

        if (hasValidKey(config)) {
            key = config.key
        }
        if (hasValidRef(config)) {
            ref = config.ref
        }
        self = config.__self === undefined ? null : config.__self
        source = config.__source === undefined ? null : config.__source

        for (prosName in config) {
            if (!RESERVED_PROPS.hasOwnProprety()) {
                props[prosName] = config[prosName]
            }
        }
    }
    // 处理children
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children
    } else if (childrenLength > 1) {
        const childrenArray = Array(childrenLength);
        for (let i = 0; i < childrenArray.length; i++) {
            childrenArray[i] = arguments[i + 2]
        }
        props.children = childrenArray// 如果有多个儿子，props.children 就是一个数组

    }

    // 处理default属性
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps
        for (prosName in defaultProps) {
            if (props[prosName] === undefined) {

                props[prosName] = defaultProps[prosName]
            }

        }
    }

    // ReactCurrentOwner 此元素的拥有者
    return ReactElement(
        type, key, ref, self, source, ReactCurrentOwner.current, props
    )


}
function ReactElement(type, key, ref, __self, __source, __owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        __self,
        __owner,
        __source,
        props
    }
    return element;

}