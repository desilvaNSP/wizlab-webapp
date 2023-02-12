import React, { useRef, useEffect } from 'react';
import MenuItem from './MenuItem';
import Clock from 'react-live-clock';

const Slider = props => {
    const { handleClose } = props;
    /**
 * Hook that alerts clicks outside of the passed ref
 */
    const useOutsideAlerter = (ref, thatProps) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    thatProps.handleClose();
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

    return (
        <aside className="aside-menu" ref={wrapperRef}>
            <div className="aside-menu-header">
                <div class="aside-menu-header__time">
                    <Clock format={'h:mm A'} ticking={true} timezone={'Europe/Stockholm'} />
                </div>
                <div class="aside-menu-header__date">
                    <Clock date={new Date()} format={'MMMM D, YYYY'} timezone={'Europe/Stockholm'} />
                </div>
                <div className="aside-menu-header__country">Europe/Stockholm</div>
            </div>
            <ul className="aside-menu-content">
                <MenuItem item={{ "path": "/", "name": "Dashboard" }} hideSlider={handleClose} />
                <MenuItem item={{ "path": "/classes", "name": "Class Management" }} hideSlider={handleClose} />
                <MenuItem item={{ "path":"/sessions", "name":"Session Management"}} hideSlider={handleClose} />
                <MenuItem item={{ "path": "/instructors", "name": "Instructor Management" }} hideSlider={handleClose} />
                <MenuItem item={{ "path": "/payments", "name": "Payment Management" }} hideSlider={handleClose} />
                <MenuItem item={{ "path":"/students", "name":"Student Management"}} hideSlider={handleClose} />
                {/* <MenuItem item={{ "path": "/institutes", "name": "Institute Management" }} hideSlider={handleClose} /> */}
            </ul>
            {/* <div className="aside-menu-version">Version : {process.env.REACT_APP_VERSION}</div> */}
        </aside>
    );
}

export default Slider;  