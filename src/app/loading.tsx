// 
export default function Loading() {

    return (
        <div className="flex items-center justify-center h-10 space-x-1">
            <span
                className={`block w-8 h-8 rounded-full animate-bounce bg-primary`}
                style={{ animationDelay: '0s' }}
            />
            <span
                className={`block w-8 h-8 rounded-full animate-bounce bg-secondary`}
                style={{ animationDelay: '0.2s' }}
            />
            <span
                className={`block w-8 h-8 rounded-full animate-bounce bg-primary`}
                style={{ animationDelay: '0.4s' }}
            />
        </div>
    );
};
