import React, { Component } from "react";
import  {TabMenu}  from "primereact/tabmenu";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { label: "Home", icon: "pi pi-fw pi-home" },
        { label: "New Question", icon: "pi pi-fw pi-plus" },
        { label: "Leader Board", icon: "pi pi-fw pi-id-card" },
        { label: "Logout", icon: "pi pi-fw pi-sign-out" },
      ],
      activeItem: {},
    };
  }
  render() {
    return (
        <div>
          <span>
          <TabMenu
            model={this.state.items}
            activeItem={this.state.activeItem}
            onTabChange={(e) => this.setState({ activeItem: e.value })}
          />
          <p>
            Welcome Text!
          </p>
          </span>
        </div>
    );
  }
}

export default Header;
