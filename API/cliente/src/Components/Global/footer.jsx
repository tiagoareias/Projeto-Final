import React, { Component } from "react";
import '../../CssComponents/footer.css'
class Footer extends Component {
  render() {
    return (
		<footer class="footer-distributed">

			<div class="footer-right">

				<a ><i class="fa fa-facebook"></i></a>
				<a ><i class="fa fa-twitter"></i></a>
				<a ><i class="fa fa-linkedin"></i></a>
				<a ><i class="fa fa-github"></i></a>

			</div>

			<div class="footer-left">

				<p class="footer-links">
					<a >Home</a>
					·
					·
					
					<a >About</a>
					·
					·
					<a >Contact</a>
				</p>

				<p>MER &copy; 2019</p>
			</div>

		</footer>
      );
  }
}

export default Footer;
