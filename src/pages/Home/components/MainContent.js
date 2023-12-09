import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MainContent() {
  const { myclass } = useSelector((state) => state.class);

  return (
    <>
      <div class="p-4 sm:ml-64 bg-white">
        <div class="p-4 rounded-lg">
          <div class="grid grid-cols-3 gap-4 mb-4">
          {myclass?.map((element,index)=>(
            <Link key={index} to={`/class/${element.slug}`} className="relative bg-white rounded-md shadow-md h-[250px] flex flex-col">
              <div className="bg-blue-500 text-white py-4 px-4 rounded-t-md">
                <h2 className="text-lg font-semibold mb-4">{element.title}</h2>
                <p className="text-sm font-medium">{element.owner.name}</p>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 left-full transform -translate-x-full -translate-y-full">
                  <div className="rounded-full overflow-hidden border-2 border-white w-16 h-16">
                    <img
                      src={element.owner.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-md mt-1">
                  <p className="text-sm font-medium text-gray-500">
                    {element.subTitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
            
          
          </div>
         
        </div>
      </div>
    </>
  );
}

export default MainContent;
