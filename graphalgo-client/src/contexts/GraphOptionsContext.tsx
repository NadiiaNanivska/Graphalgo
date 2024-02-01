import React, { createContext, useContext, useState } from 'react';

interface CurrentUserContextType {
    canAddNode: boolean,
    setCanAddNode: React.Dispatch<React.SetStateAction<boolean>>,
    canAddEdge: boolean,
    setCanAddEdge: React.Dispatch<React.SetStateAction<boolean>>,
    canRemoveEdge: boolean,
    setCanRemoveEdge: React.Dispatch<React.SetStateAction<boolean>>,
    canRemoveNode: boolean,
    setCanRemoveNode: React.Dispatch<React.SetStateAction<boolean>>,
}

export const GraphOptionsContext = createContext<CurrentUserContextType | null>(null);

export const GraphOptionsProvider = (_props: { children: React.ReactNode }) => {
    const [canAddNode, setCanAddNode] = useState(false);
    const [canAddEdge, setCanAddEdge] = useState(false);
    const [canRemoveEdge, setCanRemoveEdge] = useState(false);
    const [canRemoveNode, setCanRemoveNode] = useState(false);

    const contextValue = {
        canAddNode,
        setCanAddNode,
        canAddEdge,
        setCanAddEdge,
        canRemoveEdge,
        setCanRemoveEdge,
        canRemoveNode,
        setCanRemoveNode,
    };

    return (
        < GraphOptionsContext.Provider value={contextValue}>
            {_props.children}
        </GraphOptionsContext.Provider>
    );
};

export const useGraphOptions = () => {
    const context = useContext(GraphOptionsContext);

    if (!context) {
        throw new Error('useGraphOptions must be used within a GraphOptionsProvider');
    }

    return context;
};
