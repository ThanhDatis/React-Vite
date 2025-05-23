import HeaderMenuIcons from './HeaderMenuIcons'

export default function HeaderTopBar() {
    return (
        <div className='headerTopBar'>
            <div className='headerTopBar-logo'>YOUR LOGO</div>
            <div className='headerTopBar-search'>
                <div className='headerTopBar-searchBox'>
                    <input
                    className='searchBox-input'
                    type="text"
                    placeholder="Search"
                     />
                    <svg className="Search" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2_19683)">
                            <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                            <path d="M10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.8056 15.1944 2 10.5 2C5.8056 2 2 5.8056 2 10.5C2 15.1944 5.8056 19 10.5 19Z" stroke="#333333" strokeWidth="2.5" strokeLinejoin="round"/>
                            <path d="M13.3284 7.17155C12.6045 6.4477 11.6045 6 10.5 6C9.39541 6 8.39541 6.4477 7.67151 7.17155" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.6108 16.6113L20.8535 20.854" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_2_19683">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <HeaderMenuIcons />
        </div>
    )
} 