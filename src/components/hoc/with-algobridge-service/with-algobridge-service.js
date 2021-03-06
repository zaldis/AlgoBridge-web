import React from 'react';
import {AlgoBridgeServiceConsumer} from '../../../components/service-context/algobridge-service-constext';


const withBookstoreService = () => (Wrapper) => {
    return (props) => {
        return (
            <AlgoBridgeServiceConsumer>
                {
                    (algoBrigdeService) => {
                        return (
                            <Wrapper {...props} 
                                algoBridgeService={algoBrigdeService} />
                        );
                    }
                }
            </AlgoBridgeServiceConsumer> 
        );
    }
};

export default withBookstoreService;

