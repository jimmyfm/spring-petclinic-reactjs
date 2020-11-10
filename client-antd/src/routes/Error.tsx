import { notification } from "antd";
import React, { FC, useEffect, useState } from "react";

export const Error: FC<{}> = () => {
    const [error, setError] = useState<{ status?: string, message?: string }>({});

    useEffect(() => {
        fetch(`/api/oups`)
            .then(r => r.json())
            .then(j => setError(j));
    }, []);

    useEffect(() => {
        if (!error.status) return;

        notification["error"]({
            message: error.status,
            description: error.message,
        });
    }, [error]);

    return (
        <>
            <p>{error.status}</p>
            <p>{error.message}</p>
        </>
    );
};
