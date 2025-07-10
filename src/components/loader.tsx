// Types
type LoaderProps = {
    size: '2' | '3' | '4' | '6' | '8';
};

// 
const sizeMap = {
    '2': 'w-2 h-2',
    '3': 'w-3 h-3',
    '4': 'w-4 h-4',
    '6': 'w-6 h-6',
    '8': 'w-8 h-8',
};

// 
export const ThreeDotLoader = ({ size }: LoaderProps) => {
    const sizeClass = sizeMap[size];

    return (
        <div className="flex items-center justify-center h-10 space-x-1">
            <span
                className={`block ${sizeClass} rounded-full animate-bounce bg-primary`}
                style={{ animationDelay: '0s' }}
            />
            <span
                className={`block ${sizeClass} rounded-full animate-bounce bg-secondary`}
                style={{ animationDelay: '0.2s' }}
            />
            <span
                className={`block ${sizeClass} rounded-full animate-bounce bg-primary`}
                style={{ animationDelay: '0.4s' }}
            />
        </div>
    );
};
