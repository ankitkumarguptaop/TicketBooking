import { seatTakenByOther } from "@/entities/seat";
import { holdApi, holdConfirmed, holdRejected, holdReleased } from "@/features/hold-seats";
import {
  maxSeatsPerBooking,
  seatDeselected,
  seatSelected,
  selectSelectedSeatIds,
} from "@/features/select-seats";
import { getErrorMessage } from "@/shared/api/get-error-message";

/**
 * Picks or un-picks a seat. Picking selects it straight away (so the UI feels instant),
 * then asks the API to hold it and rolls back if someone else got there first.
 */
export const toggleSeat =
  (showId: string, seatId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const selected = selectSelectedSeatIds(getState(), showId);

    if (selected.includes(seatId)) {
      dispatch(seatDeselected({ showId, seatId }));
      void dispatch(holdApi.endpoints.releaseSeat.initiate({ showId, seatId }));
      if (selected.length === 1) dispatch(holdReleased());
      return;
    }

    if (selected.length >= maxSeatsPerBooking) {
      dispatch(holdRejected({ showId, message: `You can book up to ${maxSeatsPerBooking} seats at a time` }));
      return;
    }

    dispatch(seatSelected({ showId, seatId }));
    const result = await dispatch(holdApi.endpoints.holdSeat.initiate({ showId, seatId }));

    if (result.error) {
      dispatch(seatDeselected({ showId, seatId }));
      dispatch(seatTakenByOther(showId, seatId));
      dispatch(holdRejected({ showId, message: getErrorMessage(result.error) }));
      return;
    }

    dispatch(holdConfirmed({ showId, heldUntil: result.data.heldUntil }));
  };
