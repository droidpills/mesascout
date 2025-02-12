import Script from "next/script";


const GoogleAnalytics: React.FC = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=G-J2GY2ZHKX8`}
    />
    <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-J2GY2ZHKX8', {
                          page_path: window.location.pathname,
                          });
                        `,
            }}
          />
        </>
      );
    };

    
    export default GoogleAnalytics;