import callAction1 from "../../../../public/Resources/CallAction/callAction1.png";
import callAction2 from "../../../../public/Resources/CallAction/callAction2.png";
import callAction3 from "../../../../public/Resources/CallAction/callAction3.png";
const CallToAction = () => {
  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 p-2">
          <div>
            <img className="w-full h-full" src={callAction1} />
          </div>
          <div className="row-span-2">
            <img className="w-full h-full py-7" src={callAction2} />
          </div>
          <div>
            <img className="w-full h-full" src={callAction3} />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center p-5">
          <div className="text-left flex flex-col space-y-2">
            <h1 className="mb-5 text-xl md:text-3xl font-black">
              Unlocking Hearts and Changing Lives: The Pawsome Power of Pet
              Adoption!
            </h1>
            <div className="p-5 italic text-sm flex flex-col space-y-2">
              <p>
                When you adopt a pet, you're opening your heart to a furry
                friend who will reciprocate your love unconditionally. The bond
                formed is unlike any other, bringing joy and companionship to
                both your lives.
              </p>
              <p>
                Adopting a pet from a shelter means giving a second chance to an
                animal in need. By choosing adoption, you directly contribute to
                reducing the population of homeless animals and provide a loving
                home where they can thrive.
              </p>
              <p>
                Shelters offer a diverse range of pets, from playful kittens and
                puppies to mature cats and dogs. Whether you're looking for an
                energetic running partner or a laid-back cuddle buddy, there's a
                perfect match for every lifestyle.
              </p>
              <p>
                When you adopt, you become part of a community that values
                animal welfare. Shelters and rescue organizations often provide
                resources, support, and advice, creating a network of
                like-minded individuals who share a love for pets.
              </p>
              <p>
                Adopted pets seem to understand that they've been given a second
                chance. Their gratitude often translates into deep loyalty and a
                special connection, making the adoption journey immensely
                rewarding.
              </p>
              <p>
                In the eyes of an adopted pet, you're a hero who changed their
                life. The joy, gratitude, and love they bring into your home are
                immeasurable, making the decision to adopt not just an act of
                kindness but a transformative experience for both you and your
                new furry friend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
