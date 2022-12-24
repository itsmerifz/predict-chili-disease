import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import * as https from 'https'
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


const Nav = () => {
  return (
    <nav className="flex items-center justify-center flex-wrap bg-slate-100 shadow p-4">
      <span className="font-logo text-xl text-primary font-extrabold">
        ChiliLeaves Check
      </span>
    </nav>
  );
};

function App() {
  const [image, setImage] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const webcamRef = useRef(null);

  const captureImage = () => {
    let imageSrc = webcamRef.current.getScreenshot();
    imageSrc = imageSrc.split(",")[1];
    console.log(imageSrc);
    setImage(imageSrc);
    MySwal.fire({
      title: <p>Foto Berhasil Diambil!</p>,
      icon: "success",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
    });
  };


  const predictImage = async () => {
    setPredicting(true);
    await axios.post("http://192.168.0.103:5000/predict", {gambar: image}).then((res) => {
      setPredicting(false);
      console.log(res.data);
      MySwal.fire({
        title: <p>{res.data.message}</p>,
        text: `Tanaman cabe kamu ${res.data.predicted_class} sebesar ${res.data.percentage}`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      })
    }).catch((err) => {
      setPredicting(false);
      MySwal.fire({
        title: <p>Gagal Deteksi!</p>,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }

  return (
    <>
      <Helmet>
        <title>ChiliLeaves Check!</title>
        <meta
          name="description"
          content="Ini merupakan aplikasi deteksi penyakit pada daun tanaman cabe"
        />
        <meta name="keywords" content="cabe,penyakit,ai,bot,deteksi" />
      </Helmet>
      <div className="prose w-full mx-auto sm:max-w-xl">
        <Nav />
        <div className="p-3 flex items-center justify-center">
          <div className="w-[328px] h-[590px] bg-[#d9d9d9] rounded-3xl">
            <Webcam
              ref={webcamRef}
              muted={true}
              screenshotQuality={0.8}
              width={1080}
              videoConstraints={{
                facingMode: "environment",
              }}
            />
            <button className="shutter" onClick={captureImage}></button>
          </div>
        </div>
        <div className="p-3 flex items-center justify-center">
          {image ? (
            predicting ? (
              <button onClick={predictImage} className="btn btn-primary font-sans rounded-3xl w-[328px] h-14 flex items-center justify-center loading">
                <span className="text-white text-lg">Cek Daun</span>
              </button>
            ) : (
              <button onClick={predictImage} className="btn btn-primary font-sans rounded-3xl w-[328px] h-14 flex items-center justify-center">
                <span className="text-white text-lg">Cek Daun</span>
              </button>
            )
          ) : (
            <button onClick={predictImage} className="btn btn-primary font-sans rounded-3xl w-[328px] h-14 flex items-center justify-center btn-disabled">
              <span className="text-white text-lg">Cek Daun</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
