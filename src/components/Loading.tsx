
import { ReactNode } from 'react';
import "../styles/loading.css";
// mejor importemos la imagen svg de carga
import load from "./../assets/load.svg";
interface LoadingProps {
    isLoading: boolean;
    children?: ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
    return (
        <div >
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <img src={load} alt
                    ="loading" className="w-20 h-20" />
              </div>
              
            )}
            <div className={isLoading ? 'blur-sm' : ''}>

            {children}
            </div>
        </div>
    );
};




export default Loading;

