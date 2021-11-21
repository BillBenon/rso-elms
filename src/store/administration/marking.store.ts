import { useMutation, useQuery } from 'react-query';

import { markingService } from '../../services/administration/marking.service';

class MarkingStore {

finishMarking() {
    return useMutation(markingService.finishMarking);
}

}

export const markingStore = new MarkingStore();

