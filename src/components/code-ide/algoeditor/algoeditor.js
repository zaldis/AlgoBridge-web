import React, {Component} from 'react';

import {Container, Form, Row} from "react-bootstrap";

import OperationConstructor from "../operation-constructor";
import RowLine from "../editor/row";
import {isBlockOperation, isEndBlockOperation} from "../operation";


const funcs = [
    {
        name: 'set_item_by_index',
        paramsCount: 3,
        description: ''
    }, {
        name: 'get_item_by_index',
        paramsCount: 2,
        description: ''
    }
];

class AlgoEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRow: -1
        }
    }

    render() {
        const {operations} = this.props;

        let code = "";
        if (this.state.selectedRow === -1) {
            code = this._makeAlgoOperations(operations);
        } else {
            code = this._makeOperationConstructor(operations[this.state.selectedRow]);
        }

        return (
            <div>{code}</div>
        )
    }

    _makeAlgoOperations(operations) {
        return (
            <Form.Group as={Row}>
                <Container>
                    {this._makeOperationRows(operations)}
                </Container>
            </Form.Group>
        );
    }

    _makeOperationConstructor(operation) {
        const selectedOperation = JSON.parse(
            JSON.stringify(operation)
        );

        return (
            <OperationConstructor
                funcs={funcs}
                operation={selectedOperation}
                handleSaveOperation={(updatedOperation) => this.handleSaveRowOperation(updatedOperation)}
                handleClose={() => this._handleUnselectRow()}
            />
        );
    }

    handleSaveRowOperation = (newOperation) => {
        const {operations, syncOperations} = this.props;

        const updatedOperations = [
            ...operations.slice(0, this.state.selectedRow),
            newOperation,
            ...operations.slice(this.state.selectedRow + 1)
        ];
        this.setState( { selectedRow: -1 }, () => {
            syncOperations(updatedOperations);
        });
    };

    _makeOperationRows(operations) {
        const {readOnly = false} = this.props;
        let nest = 0;
        return operations.map((operation, index) => {
            let tartget_nest = nest;
            if (isBlockOperation(operation))
                nest += 1;
            if (isEndBlockOperation(operation)) {
                nest -= 1;
                tartget_nest = nest;
            }
            return (
                <Row key={index}>
                    <RowLine
                        number={index}
                        operation={operation}
                        comment=""
                        readOnly={readOnly}
                        nest={tartget_nest}
                        handleAddRow={() => this._handleAddRow(index)}
                        handleRemoveRow={() => this._handleRemoveRow(index)}
                        handleMoveRowUp={() => this._handleMoveRowUp(index)}
                        handleMoveRowDown={() => this._handleMoveRowDown(index)}
                        handleSelectRow={() => this._handleSelectRow(index)}
                        handleChangeRowOperationFromDrag={
                            (newOpr, indFrom, indTo) => this._handleChangeRowOperationFromDrag(newOpr, indFrom, indTo)
                        }
                    />
                </Row>
            );
        });
    }

    _handleSelectRow = (index) => {
       this.setState({selectedRow: index});
    };

    _handleUnselectRow = () => {
      this.setState({selectedRow: -1});
    };

    _handleAddRow = (index) => {
        const {operations, syncOperations} = this.props;

        const emptyOperation = {type: 'empty', parameter: {}};
        const updatedOperations = [
            ...operations.slice(0, index+1),
            emptyOperation,
            ...operations.slice(index+1)
        ];
        this.setState({selectedRow: -1}, () => {
            syncOperations(updatedOperations);
        });
    };

    _handleRemoveRow = (index) => {
        const {operations, syncOperations} = this.props;

        if (operations.length === 1)
            return;

        const updatedOperations = [
            ...operations.slice(0, index),
            ...operations.slice(index + 1)
        ];
        this.setState({selectedRow: -1}, () => {
            syncOperations(updatedOperations)
        });
    }

    _handleMoveRowUp = (index) => {
        const {operations, syncOperations} = this.props;

        if (index === 0)
            return;

        const updatedOperations = [
            ...operations.slice(0, index-1),
            operations[index],
            operations[index-1],
            ...operations.slice(index + 1)
        ];
        this.setState({selectedRow: -1}, () => {
            syncOperations(updatedOperations);
        });
    }

    _handleMoveRowDown = (index) => {
        const {operations, syncOperations} = this.props;
        if (index === operations.length - 1)
            return;

        const updatedOperations = [
            ...operations.slice(0, index),
            operations[index+1],
            operations[index],
            ...operations.slice(index + 2)
        ];
        this.setState({selectedRow: -1}, () => {
            syncOperations(updatedOperations);
        });
    }

    _handleChangeRowOperationFromDrag = (newOperation, indexFrom, indexTo) => {
        const {operations, syncOperations} = this.props;

        let updatedOperations = [
            ...operations.slice(0, indexFrom),
            {type: 'empty', parameter: {}},
            ...operations.slice(indexFrom + 1)
        ];
        updatedOperations = [
            ...updatedOperations.slice(0, indexTo),
            newOperation,
            ...updatedOperations.slice(indexTo + 1)
        ];
        syncOperations(updatedOperations);
    }
}


export default AlgoEditor;
