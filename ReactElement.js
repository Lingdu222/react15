
import { REACT_ELEMENT_TYPE } from '../shard/ReactSymbols'
import ReactCurrentOwner from './ReactCurrentOwner'
function hasVildKey(config) {
    return config.key !== undefined
}
function hasVildRef(config) {
    return config.ref !== undefined
}

const AB = {
    key: true,
    ref: true,
    __self: true,
    __source: true,
    __owner: true
}

export default function createElement(type, config, children) {
    let propName;
    const props = {};
    let key = null;
    let ref = null;
    let self = null;
    let source = null

    if (config !== null) {
        if (hasVildKey(config)) {
            key = config.key
        }
        if (hasVildRef(config)) {
            ref = config.ref
        }

        self = config.__self === undefined ? null : config.__self
        source = config.__source === undefined ? null : config.__source

        for (propName in config) {
            if (!AB.hasOwnProprety()) {
                props[propName] = config[propName]
            }
        }

    }

    // 处理children
    const childrenLength = arguments.length - 2
    if (childrenLength === 1) {
        props.children = children

    } else if (childrenLength > 1) {
        const childrenArray = Array(childrenLength)
        for (let i = 0; i < childrenArray.length; i++) {
            childrenArray[i] = arguments[i + 2];

        }
        props.children = childrenArray
    }

    // 处理default 属性
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps
        for (propName in defaultProps) {
            if (props[propName] === undefined) {

                props[propName] = defaultProps[propName]
            }
        }
    }
    return ReactElement(
        type, key, ref, self, source, ReactCurrentOwner.current, props
    )
}

function ReactElement(type, key, ref, __self, __source, __owner, props) {
    const ele = {

        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        __self,
        __source,
        __owner,
        props

    }
    return ele;

}