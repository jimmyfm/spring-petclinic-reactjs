import React, { FC, useEffect, useState } from "react";

export const Error: FC<{}> = () => {
    const [error, setError] = useState<{ status?: string, message?: string }>({});

    useEffect(() => {
        fetch(`/api/oups`)
            .then(r => r.json())
            .then(j => setError(j));
    }, []);

    return (
        <>
            <p>{error.status}</p>
            <p>{error.message}</p>
        </>
    );
};
