import React, { useRef } from 'react';
import { useMenuIsFixed } from './hooks/get-menu-transition-values';
import { useMenuScrollPosition } from './hooks/useMenuScrollPosition';
import TopContacts from './top-contact';
import TopMenues from './top-menues';

type Props = { transparentHeader: boolean };

const MainHeader: React.FC<Props> = ({ transparentHeader }) => {
  const menuRef = useRef<HTMLElement>(null);
  const menuVisibility = useMenuScrollPosition(menuRef);
  const menuIsFixed = useMenuIsFixed(menuVisibility);

  return (
    <>
      <TopContacts />
      <TopMenues
        framerScrollPosition={menuVisibility}
        transparent={transparentHeader}
        invisible={menuIsFixed}
        ref={menuRef}
      />
      {menuIsFixed && (
        <TopMenues
          framerScrollPosition={menuVisibility}
          fixed
          transparent={transparentHeader}
        />
      )}
    </>
  );
};

export default MainHeader;
