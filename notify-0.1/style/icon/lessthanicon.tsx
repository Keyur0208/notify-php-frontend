import clsx from "clsx";

export default function LessThanIcon({ control }: any) {
    return (
        <>
            <svg width="25" height="25" viewBox="0 0 20 20" style={{ marginTop: '0.1rem' }} className={clsx('transform transition-transform duration-300', {
                'rotate-180': control,
            })} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8751 15C11.7094 15 11.5504 14.9341 11.4332 14.8169L7.05824 10.4419C6.94107 10.3247 6.87524 10.1657 6.87524 10C6.87524 9.83428 6.94107 9.67534 7.05824 9.55814L11.4332 5.18314C11.5511 5.06929 11.709 5.00629 11.8729 5.00771C12.0367 5.00914 12.1935 5.07487 12.3094 5.19075C12.4253 5.30663 12.491 5.46339 12.4924 5.62726C12.4938 5.79113 12.4308 5.94901 12.317 6.06688L8.38386 10L12.317 13.9331C12.4012 14.0217 12.4578 14.1329 12.4801 14.253C12.5024 14.3732 12.4894 14.4972 12.4427 14.6101C12.3959 14.723 12.3174 14.82 12.2167 14.8892C12.1159 14.9584 11.9973 14.9969 11.8751 15Z" fill="#73818e" />
            </svg>

        </>
    )
}