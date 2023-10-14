import Script from "next/script";

function Home() {
  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-717418224" />
      <Script id="google-analytics">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', 'AW-717418224');
        `}
      </Script>
    </div>
  );
}

export default Home;
