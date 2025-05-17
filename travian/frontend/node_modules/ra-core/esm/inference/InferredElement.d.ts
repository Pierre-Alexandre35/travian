/// <reference types="react" />
import { InferredType } from './types';
declare class InferredElement {
    private type?;
    private props?;
    private children?;
    constructor(type?: InferredType, props?: any, children?: any);
    getElement(props?: {}): import("react").ReactElement<{}, string | import("react").JSXElementConstructor<any>>;
    getProps(): any;
    isDefined(): boolean;
    getRepresentation(): string;
}
export default InferredElement;
//# sourceMappingURL=InferredElement.d.ts.map