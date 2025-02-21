
import { ReactNode } from 'react';
import "../styles/loading.css";
interface LoadingProps {
    isLoading: boolean;
    children?: ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
    return (
        <div >
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <img src="./load.svg" alt="" className="size-1/4" />
              </div>
              
            )}
            <div className={isLoading ? 'blur-sm' : ''}>

            {children}
            </div>
        </div>
    );
};




export default Loading;

