import React, { useEffect, useState } from 'react';
import { Typography, Layout, Row, InputNumber, Button } from "antd";
import { Equation } from '../../model';
import { getNewEquation, postEquationResult } from '../../hooks/math';

export const MathPage = () => {

    const [equation, setEquation] = useState<Equation>();
    const [result, setResult] = useState<number>();

    useEffect(() => {
        getNewEquation().then(eq => {
            setEquation(eq);
            setResult(undefined);
        });
    }, [])

    const onResultChange = (value: string | number | null) => {
        if (value !== null) {
            if (typeof(value) === 'string') {
                setResult(parseInt(value))
            } else {
                setResult(value);
            }
        } else {
            setResult(undefined);
        }
    }

    const onSubmit = () => {
        if (equation !== undefined && result !== undefined) {
            postEquationResult(equation, result).then(ok => {
                if (ok) {
                    getNewEquation().then(eq => {
                        setEquation(eq);
                        setResult(undefined);
                    });
                }
            });
        }
    }

    return (<Layout.Content>
        {
            equation !== undefined && (
                <Row>
                    <Typography>
                        <Typography.Paragraph>{`${equation.a} ${equation.op} ${equation.b} = `}</Typography.Paragraph>
                    </Typography>
                    <InputNumber onChange={onResultChange} value={result} />
                    <Button onClick={onSubmit}>Submit</Button>
                </Row>)
        }
    </Layout.Content>)
}