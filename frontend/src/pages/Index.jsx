import { Link } from "react-router-dom";
import search from "../assets/search.svg";
import personal from "../assets/personal.svg";

const Index = () => {
  return (
    <div>
      <section className="bg-purple vh-100 d-flex justify-content-center align-items-center flex-column ">
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <img
            src="https://freesvg.org/img/CrazyTerabyte_Book.png"
            height={180}
          />
          <h1
            data-aos="fade-up"
            className="display-2 fw-bolder text-white text-center"
          >
            Welcome to boxbook!
          </h1>
          <h3 data-aos="fade-down" className="text-white text-center">
            The web where manage your books and socialize will never be the same
          </h3>
          <Link
            data-aos="flip-down"
            className="btn btn-outline-light btn-lg fw-bolder fs-4 mt-5 mt-lg-0 mt-xl-0 mt-xxl-0"
            to={"/signup"}
          >
            Start now!
          </Link>
        </div>
      </section>
      <div className="position-relative mb-5 pb-5">
        <div className="custom-shape-divider-top-1646087169">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <section className="pb-5 pt-5 d-flex flex-column justify-content-center align-items-center gap-4">
        <h1 className="fw-bolder display-2 ">Why you should sign in?</h1>
        <h4 className="text-center mb-">Evaluate for yourself...</h4>
        <div className="row shadow-lg py-4 " style={{ width: "90%" }}>
          <div className="col">
            <div className="card text-white bg-purple mb-3 w-100">
              <div className="card-header fw-bold text-center fs-2">#1</div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Secure</h5>
                <i className="fas fa-lock fa-7x"></i>
                <p className="card-text pt-2">We care about you!</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-white bg-purple mb-3 w-100">
              <div className="card-header fw-bold text-center fs-2">#2</div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Everywhere</h5>
                <i className="fas fa-wifi fa-7x"></i>
                <p className="card-text pt-2">Wifi?, check your books</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-white bg-purple mb-3 w-100">
              <div className="card-header fw-bold text-center fs-2">#3</div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Social</h5>
                <i className="fas fa-handshake fa-7x"></i>
                <p className="card-text pt-2">Meet people!</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-white bg-purple mb-3 w-100">
              <div className="card-header fw-bold text-center fs-2">#4</div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Its funny!</h5>
                <i className="fas fa-grin-beam fa-7x"></i>
                <p className="card-text pt-2 text-center">
                  Get fun discovering new books!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative mt-5">
        <div className="custom-shape-divider-bottom-1646101047">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <section className="bg-purple py-5">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <h2 className="text-white fw-bold text-center">
                Search for your favorite books and add them to your catalog
              </h2>
            </div>
            <div className="col" style={{ backgroundColor: "white" }}>
              <img src={search} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-purple pb-5">
        <div className="container">
          <div className="row">
            <div className="col" style={{ backgroundColor: "white" }}>
              <img src={personal} alt="" className="w-100" />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <h2 className="text-white fw-bold text-center">
                You have full control of your catalog and your account
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="custom-shape-divider-top-1646101271">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <section className="d-flex flex-column justify-content-center vh-100  align-items-center">
        <div className="container">
          <h1 className="text-center">
            And for that and more, you should register and start to enjoy while
            reading!
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Index;
