import React, { useEffect, useState } from 'react';
import { Typography, Layout } from "antd";
import { Equation } from '../../model';
import { getNewEquation } from '../../hooks/math';

export const MathPage = () => {

    const [equation, setEquation] = useState<Equation>();

    useEffect(() => {
        getNewEquation().then(eq => setEquation(eq));
    }, [])

    return (<Layout.Content>
        {
            equation !== undefined && (
                <Typography>
                    <Typography.Paragraph>{`${equation.a} ${equation.op} ${equation.b}`}</Typography.Paragraph>
                </Typography>)
        }
    </Layout.Content>)
}