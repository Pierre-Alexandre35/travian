var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import Datagrid from './datagrid/Datagrid';
import SingleFieldList from './SingleFieldList';
import ArrayField from '../field/ArrayField';
import BooleanField from '../field/BooleanField';
import ChipField from '../field/ChipField';
import DateField from '../field/DateField';
import EmailField from '../field/EmailField';
import NumberField from '../field/NumberField';
import ReferenceField from '../field/ReferenceField';
import ReferenceArrayField from '../field/ReferenceArrayField';
import TextField from '../field/TextField';
import UrlField from '../field/UrlField';
export default {
    table: {
        component: function (props) { return React.createElement(Datagrid, __assign({ rowClick: "edit" }, props)); },
        representation: function (_, children) { return "        <Datagrid rowClick=\"edit\">\n" + children.map(function (child) { return "            " + child.getRepresentation(); }).join('\n') + "\n        </Datagrid>"; },
    },
    array: {
        // eslint-disable-next-line react/display-name
        component: function (_a) {
            var children = _a.children, props = __rest(_a, ["children"]);
            return (React.createElement(ArrayField, __assign({}, props),
                React.createElement(SingleFieldList, null,
                    React.createElement(ChipField, { source: children.length > 0 && children[0].props.source }))));
        },
        representation: function (props, children) {
            return "<ArrayField source=\"" + props.source + "\"><SingleFieldList><ChipField source=\"" + (children.length > 0 && children[0].getProps().source) + "\" /></SingleFieldList></ArrayField>";
        },
    },
    boolean: {
        component: BooleanField,
        representation: function (props) { return "<BooleanField source=\"" + props.source + "\" />"; },
    },
    date: {
        component: DateField,
        representation: function (props) { return "<DateField source=\"" + props.source + "\" />"; },
    },
    email: {
        component: EmailField,
        representation: function (props) { return "<EmailField source=\"" + props.source + "\" />"; },
    },
    id: {
        component: TextField,
        representation: function (props) { return "<TextField source=\"" + props.source + "\" />"; },
    },
    number: {
        component: NumberField,
        representation: function (props) { return "<NumberField source=\"" + props.source + "\" />"; },
    },
    reference: {
        component: ReferenceField,
        representation: function (props) {
            return "<ReferenceField source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextField source=\"id\" /></ReferenceField>";
        },
    },
    referenceChild: {
        component: function (props) { return React.createElement(TextField, __assign({ source: "id" }, props)); },
        representation: function () { return "<TextField source=\"id\" />"; },
    },
    referenceArray: {
        component: ReferenceArrayField,
        representation: function (props) {
            return "<ReferenceArrayField source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextField source=\"id\" /></ReferenceArrayField>";
        },
    },
    referenceArrayChild: {
        component: function (props) { return React.createElement(TextField, __assign({ source: "id" }, props)); },
        representation: function () { return "<TextField source=\"id\" />"; },
    },
    richText: undefined,
    string: {
        component: TextField,
        representation: function (props) { return "<TextField source=\"" + props.source + "\" />"; },
    },
    url: {
        component: UrlField,
        representation: function (props) { return "<UrlField source=\"" + props.source + "\" />"; },
    },
};
