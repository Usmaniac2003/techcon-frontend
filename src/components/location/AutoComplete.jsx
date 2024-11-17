import { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from "@chakra-ui/react";

const AutoComplete = ({ defaultLocation, setMeetingLocation }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setMeetingLocation((meetingLocation) => {
          return { ...meetingLocation, lat, lng, addressText: description };
        });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      console.log(suggestion);
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    setValue(defaultLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocation]);

  return (
    <div ref={ref}>
      <Input
        type={"text"}
        fullWidth
        disabled={!ready}
        onChange={handleInput}
        required
        placeholder={"Search Location"}
        label={"Location"}
        value={value}
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default AutoComplete;
