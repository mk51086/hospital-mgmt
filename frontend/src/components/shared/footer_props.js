
const menu = [
  {
    label: "Our work",
    href: "/work",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const footer_props = {
  socialMedia: [
    {
      url: "/twitter",
      image: {
        alt: "Twitter",
        url: "/images/socials/Twitter.svg",
      },
    },
    {
      url: "/linkedin",
      image: {
        alt: "LinkedIn",
        url: "/images/socials/Linkedin.svg",
      },
    },
    {
      url: "/facebook",
      image: {
        alt: "Facebook",
        url: "/images/socials/Facebook.svg",
      },
    },
    {
      url: "/instagram",
      image: {
        alt: "Instagram",
        url: "/images/socials/Instagram.svg",
      },
    },
    {
      url: "/whatsapp",
      image: {
        alt: "Whatsapp",
        url: "/images/socials/Whatsapp.svg",
      },
    },
    {
      url: "/youtube",
      image: {
        alt: "Youtube",
        url: "/images/socials/Youtube.svg",
      },
    },
  ],
  additionalLinks: {
    secondary: [
      { name: "Terms and conditions", href: "/terms" },
      { name: "Privacy policy", href: "/privacy" },
    ],
  },
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  menu,
  subscription: {
    embedCode: `
          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <form  id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
              <label for="MERGE1">Name</label>
              <input type="text" name="MERGE1" id="MERGE1" size="25" value="">
              <label for="mce-EMAIL">Email</label>
              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" required>
             <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>
                <div class="clear"><input type="submit" value="Subscribe"  id="mc-embedded-subscribe" class="button"></div>
                </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
    `,
  },
};

export default footer_props;