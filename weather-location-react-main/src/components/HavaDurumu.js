

const HavaDurumu = (props) => {
    const { weather } = props
    
    if (!weather) {
        return <p>Yükleniyor... (Lokasyon erişimine izin vermeniz gerekir.)</p>
    }

    return (
        <div>
         
         <div className="flex justify-center mt-5 pt-5">
  <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div className="py-3 px-6 border-b border-gray-300">
    <h2 className="text-3xl font-bold underline">Hava Durumu</h2>
    </div>
    <div className="p-6">
      <h5 className="text-gray-900 text-xl font-medium mb-2">{weather.name}</h5>
      <p className="text-gray-700 text-base mb-1">
      <h4>Hava : {weather.weather.map((data) => data.description.charAt(0).toUpperCase() + data.description.slice(1).toLowerCase()).join(", ")}</h4>
            <p>{Math.floor(weather.main.temp)} °C </p>
      </p>
    </div>
    <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
    {new Date(weather.dt * 1000).toLocaleDateString()}
    </div>
  </div>
</div>

</div>
    )
}

export default HavaDurumu;